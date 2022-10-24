# Script for processing the raw data into the coressponding X.json files.
# Eric K. 2022

import json
import os


def read_json(path: str) -> dict:
    """ Reads a JSON file and returns the data as a dictionary. """
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def main():
    os.chdir(os.path.dirname(__file__))
    # todo get course list from degrees.json

    code = "DCC"
    version = "v5"

    courses = read_json("raw/coursesv5.json")
    degree = read_json(f"raw/{code}.json").get("v5")

    malla = {"v3": dict(), "v5": dict()}

    semester_index = 1
    for phase in degree:
        semesters = read_json(f"raw/{degree.get(phase)}")
        malla[version][phase] = {"name": phase, "semesters": dict()}
        for semester in semesters:
            semester_courses = dict()
            for course in semester:  # todo: code for plans
                course_data = courses.get(course)
                semester_courses[course] = course_data
                if course_data["type"] == "course":
                    semester_courses[course]["code"] = course
                elif course_data["type"] == "plan":
                    codes = course_data["codes"]
                    semester_courses[course]["code"] = "/".join(codes)
                semester_courses[course]["department"] = course[:2]
            malla[version][phase]["semesters"][semester_index] = {
                "number": semester_index,
                "courses": semester_courses
            }
            semester_index += 1

    # save dict as json file
    with open(f"{code}.json", "w", encoding="utf-8") as f:
        json.dump(malla, f, indent=4, ensure_ascii=False)

    # todo get degrees from files and iterate
    # todo create reverse-requisistes
    print("Done.")
    return 0


if __name__ == "__main__":
    main()
