#python -m pip install -U "pylint<2.0.0" --user
import csv, json, os, requests, geohash, pandas, re

f = open("Large_small.json", "w")

csv_name='/home/n0m3rcy/Desktop/Mahesh/data/airports.csv'
with open(csv_name,'r') as csvfile:
    csvreader = csv.DictReader(csvfile,quoting=csv.QUOTE_NONNUMERIC)
    next(csvreader)
    for row in csvreader:
        if row['type'] == "large_airport" or row['type'] == "medium_airport":
            hash = geohash.encode(row['latitude_deg'],row['longitude_deg'] )
            city = row['municipality']
            AirportCode = row['iata_code']
            f.write(hash+ ","+ '"' + re.sub(r'[^a-zA-Z0-9 ]',r'',city) + '"' +","+'"'+AirportCode+'"'+"\n")
f.close()

csv_conv='/home/n0m3rcy/Desktop/Mahesh/csvtojsonPython/Large_small.csv'        
with open(csv_conv) as cvs:
    converter = csv.reader(cvs,quotechar="'")
    url1 = "http://localhost:9200/upflights/_doc"  + '"' +  " -H " + "'Content-Type: application/json'" + ' -d'
    for row in converter:
        
        appending = "curl -POST " + '"' +url1 + "'" + '{' '"Origin": ' + row[1] + ','+ '"AirportCode": ' + row[2] + ',' +'"location": ' +'"'+row[0] + '"' + ' }' + "'"
        print( appending )
