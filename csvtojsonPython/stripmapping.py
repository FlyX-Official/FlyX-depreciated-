
import csv, json, os, requests, geohash, pandas

f = open("out.json", "w")

csv_name='/home/n0m3rcy/Desktop/wefly/data/airports.csv'
with open(csv_name) as csvfile:
    spamreader = csv.DictReader(csvfile,quoting=csv.QUOTE_NONNUMERIC)
    next(spamreader)
    for row in spamreader:
        if row['type'] == "large_airport" or row['type'] == "medium_airport":
            hash= geohash.encode(row['latitude_deg'],row['longitude_deg'] )
            city = row['municipality']
            f.write(hash+ ","+ '"' + city.strip("'") + '"' +"\n")
f.close()

csv_conv='/home/n0m3rcy/Desktop/wefly/csvtojsonPython/out.csv'        
with open(csv_conv) as cvs:
    converter = csv.reader(cvs,quotechar="'")
    url1 = "http://localhost:9200/upflights/_doc"  + '"' +  " -H " + "'Content-Type: application/json'" + ' -d'
    for row in converter:
        
        appending = "curl -POST " + '"' +url1 + "'" + '{' '"text": ' + row[1] + ',' +'"location": ' +'"'+row[0] + '"' + ' }' + "'"
        print( appending )
        