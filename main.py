import hug
from hug_middleware_cors import CORSMiddleware

api = hug.API(__name__)
api.http.add_middleware(CORSMiddleware(api))

import random

def rawToMemory():
	data = []

	with open("raw.txt", 'r') as openFile:
		section = ""
		for line in openFile:
			if line == "\n":
				openFile.readline() # Skip over second newline

				data.append(section)
				section = ""
				continue

			line = line.rstrip("\n")
			
			if section: section += " "
			section += line

	return data

lines = rawToMemory()

@hug.get("/line")
def getLine(response=None):
	return({"line": random.choice(lines)})
