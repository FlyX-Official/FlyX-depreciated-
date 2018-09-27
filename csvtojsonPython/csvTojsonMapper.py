import csv, json

csvFilePath = "/home/n0m3rcy/Documents/wefly/data/airports.csv"

jsonFilePath = "mapper.json"

data = {}

with open(csvFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for csvRow in csvReader:
        id = csvRow["id"]
        data[id] = csvRow


#print(data)

# writing to jsonfile

with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(data))
