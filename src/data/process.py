# Script for processing the raw data into the coressponding X.json files.
# Eric K. 2022

import json
import os


def read_json(path: str) -> dict:
    """ Reads a JSON file and returns the data as a dictionary. """
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def flatten(thing: list | str):
    output = []
    for item in thing:
        if type(item) == list:
            output.extend(item)
        else:
            output.append(item)
    return output


def main():
    os.chdir(os.path.dirname(__file__))
    # todo get course list from degrees.json

    malla_code = "dcc"
    version = "v5"

    courses_v5 = read_json("raw/courses_v5.json")
    courses_v5 = courses_v5 | read_json("raw/custom_v5.json")
    degree = read_json(f"raw/{malla_code}.json").get("v5")

    malla = {"v3": dict(), "v5": dict()}

    added_courses = set()

    semester_index = 1
    course_id = 0
    for phase in degree:
        semesters = read_json(f"raw/{degree.get(phase)}")
        malla[version][phase] = {"name": phase, "semesters": dict()}
        for semester in semesters:
            semester_courses = dict()
            for course in semester:  # todo: code for plans
                if course not in courses_v5:
                    raise Exception(f"Course {course} not found")
                course_data = courses_v5.get(course).copy()
                course_data["prerequisites"] = flatten(
                    course_data["prerequisites"])
                course_data["postrequisites"] = []
                if course_data["type"] == "course":
                    semester_courses[course] = course_data
                    semester_courses[course]["code"] = course
                elif course_data["type"] == "plan":
                    course = f"{course}{course_id}"
                    semester_courses[course] = course_data
                    codes = course_data["codes"]
                    semester_courses[course]["code"] = "/".join(codes)
                semester_courses[course]["department"] = course[:2]
                course_id += 1
                added_courses.add(course)
            malla[version][phase]["semesters"][semester_index] = {
                "number": semester_index,
                "courses": semester_courses
            }
            semester_index += 1

    # Remove irrelevant requirements
    for phase in malla[version]:
        for semester in malla[version][phase]["semesters"]:
            for course in malla[version][phase]["semesters"][
                            semester]["courses"]:
                course_data = malla[version][phase]["semesters"][
                            semester]["courses"][course].copy()
                if course_data["type"] == "course":
                    course_data["prerequisites"] = [
                        x for x in course_data["prerequisites"]
                        if x in added_courses]

    # Add postrequisites
    for phase in malla[version]:
        for semester in malla[version][phase]["semesters"]:
            for course in malla[version][phase]["semesters"][
                            semester]["courses"]:
                course_data = malla[version][phase]["semesters"][
                            semester]["courses"][course].copy()
                for prereq in course_data["prerequisites"]:
                    prereq_data = None
                    for phase2 in malla[version]:
                        for semester2 in malla[version][
                                phase2]["semesters"]:
                            for course2 in malla[version][
                                    phase2]["semesters"][
                                        semester2]["courses"]:
                                if course2 == prereq:
                                    prereq_data = malla[version][
                                        phase2]["semesters"][
                                            semester2]["courses"][course2]
                                    break
                            if prereq_data:
                                break
                        if prereq_data:
                            break
                    if prereq_data:
                        if "postrequisites" not in prereq_data:
                            prereq_data["postrequisites"] = []
                        prereq_data["postrequisites"].append(course)

    # Add compacted courses
    for phase in malla[version]:
        for semester in malla[version][phase]["semesters"]:
            semester_courses = malla[version][phase]["semesters"][
                semester]["courses"]
            codes = dict()
            for course in semester_courses:
                course_data = semester_courses[course]
                if course_data["type"] == "plan":
                    code = course[:5]
                    if code not in codes:
                        codes[code] = [course]
                    else:
                        codes[code].append(course)
            for code in codes:
                if len(codes[code]) > 1:
                    course_data = semester_courses[codes[code][0]].copy()
                    course_data["type"] = "compacted"
                    course_data["name"] = course_data["plural"]
                    course_data["credits"] = len(
                        codes[code]) * course_data["credits"]
                    for course_code in codes[code]:
                        semester_courses[course_code]["type"] = "compactable"
                    malla[version][phase]["semesters"][
                        semester]["courses"][f"{code}-C"] = course_data
    
    #todo: deduplicate compacted codes

    # Save dict as json file
    with open(f"{malla_code}.json", "w", encoding="utf-8") as f:
        json.dump(malla, f, ensure_ascii=False,
                  separators=(',', ': '), indent=4)

    # todo get degrees from files and iterate
    print("Done.")
    return 0


if __name__ == "__main__":
    main()
