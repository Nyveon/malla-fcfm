# Script for acquiring the raw course data
# Eric K. 2022
# From previous work: https://github.com/Nyveon/tU-Scraper

import os
import json
import requests
from bs4 import BeautifulSoup


departments = {
    "AS": 3,
    "CC": 5,
    "CI": 6,
    "CM": 306,
    "EI": 9,
    "EI2": 12060002,
    "EL": 10,
    "FI": 13,
    "GF": 15,
    "GL": 16,
    "IN": 19,
    "MA": 21,
    "MI": 23,
    "QB": 307
}


class Ramo:
    def __init__(self, soup_ramo: BeautifulSoup) -> None:
        # Nombre y código
        title_components = soup_ramo.find("h2").getText()\
            .split("\n")[1].lstrip().split(" ")
        self.code = title_components[0]
        self.nombre = " ".join(title_components[1:])

        # Leyenda details
        self.requisitos = []
        self.creditos = 0

        soup_details = soup_ramo.find("div", class_="accordion")
        soup_leyenda = soup_details.find("dl", class_="leyenda")
        soup_leyenda_dt = soup_leyenda.find_all("dt")
        soup_leyenda_dd = soup_leyenda.find_all("dd")

        for i in range(len(soup_leyenda_dt)):
            detail_type = soup_leyenda_dt[i].getText()[:-1]
            detail_content = soup_leyenda_dd[i].getText()

            if detail_type == "Créditos":
                self.creditos = int(detail_content)
            elif detail_type == "Requisitos":
                if detail_content != "No tiene":
                    self.requisitos = self.parse_requisites(detail_content)

    def __repr__(self) -> str:
        return f"{self.code} {self.nombre}"

    def to_json(self) -> dict:
        """Converts the object to JSON (dict) representation

        Returns:
            dict: Dict (JSON) of the object's attributes
        """
        return {
                "code": self.code,
                "name": self.nombre,
                "credits": self.creditos,
                "prerequisites": self.requisitos,
                "type": "course"
                }

    def parse_requisites(self, line) -> list[str | list]:
        """Parses a requisite list into ANDs and ORs

        Args:
            line (str): List of courses as a string

        Returns:
            list[str | list]: List of strings and lists (of strings)
            corresponding to the course codes. A sub-list means it's an or.
        """

        # THIS IS VERY WRONG
        # But it works for v5 courses I guess ¯\_(ツ)_/¯
        parsed = []
        line = line.replace("(", "")
        line = line.replace(")", "")
        line = line.split(",")

        for course in line:
            if "/" in course:
                course = course.split("/")
            parsed.append(course)
        return parsed


def get_courses(semester: int, department: int) -> BeautifulSoup:
    """Gets the courses from the UCampus website

    Args:
        semester (int): Number describing the semester e.g. 20211.
        department (int): Number describing the department e.g. 5 (DCC).

    Returns:
        BeautifulSoup: The BeautifulSoup object containing the course elements.
    """
    URL = ("https://ucampus.uchile.cl/m/fcfm_catalogo/"
           f"?semestre={semester}&depto={department}")
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    return soup


def parse_courses(soup: BeautifulSoup) -> list:
    """Parses the courses using the Ramo objects

    Args:
        soup (BeautifulSoup): The object containing the course elements.

    Returns:
        list: List of Ramos
    """
    ramos = []
    soup_ramos = soup.find_all("div", class_="ramo")
    for soup_ramo in soup_ramos:
        ramos.append(Ramo(soup_ramo))
    return ramos


def output_json(ramos: dict, code: str) -> None:
    """Outputs a json file with the course data

    Args:
        ramos (list): Parsed Ramos Objects
        code (str): The identifier for the file (v3, v5)
    """
    with open(f"raw/courses_{code}.json", "w",
              encoding="utf-8") as output_file:
        output_file.write(
            json.dumps(
                ramos,
                ensure_ascii=False,
                indent=4
            )
        )


def scrape(semesters: list[int], code: str) -> None:
    """Scrapes all the departments for all listed semesters

    Args:
        semesters list[int]: List of semester identifiers
        code (str): Code for the output file
    """
    output = {}
    for semester in semesters:
        for department in departments:
            courses = get_courses(semester, departments[department])
            parsed = parse_courses(courses)
            for course in parsed:
                output[course.code] = course.to_json()
            print(f"{semester}/{department} Done.")
    output_json(output, code)
    print(f"{code} Done.")


def main() -> None:
    os.chdir(os.path.dirname(__file__))
    scrape([20211, 20212, 20221, 20222], "v5")


if __name__ == "__main__":
    main()
