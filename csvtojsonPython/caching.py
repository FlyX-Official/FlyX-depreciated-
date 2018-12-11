import csv, json, os, requests, geohash, pandas, re

f = open("Large.json", "w")

csv_name='/home/n0m3rcy/Desktop/Mahesh/data/airports.csv'

with open(csv_name,'r') as csvfile:
    csvreader = csv.DictReader(csvfile,quoting=csv.QUOTE_NONNUMERIC)
    next(csvreader)
    for row in csvreader:
        if row['type'] == "large_airport":
            hash = geohash.encode(row['latitude_deg'],row['longitude_deg'] )
            city = row['municipality']
            airport_code=row['iata_code']
            f.write(hash+ ","+ '"' + re.sub(r'[^a-zA-Z0-9 ]',r'',city) + '"'+ "," +'"' + airport_code + '"' +"\n")
f.close()
