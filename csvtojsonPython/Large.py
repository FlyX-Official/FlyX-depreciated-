
import csv, json, os, requests, geohash, pandas

f = open("Large.json", "w")

csv_name='/home/n0m3rcy/Desktop/Mahesh/data/airports.csv'
with open(csv_name) as csvfile:
    spamreader = csv.DictReader(csvfile,quoting=csv.QUOTE_NONNUMERIC)
    next(spamreader)
    for row in spamreader:
        if row['type'] == "large_airport"or row['type'] == "medium_airport" :
            hash= geohash.encode(row['latitude_deg'],row['longitude_deg'] )
            longitude = str(row['longitude_deg'])
            latitude = str(row['latitude_deg'])
            city = row['municipality']
            airport_code= row['iata_code']
            f.write(hash+ ","+ '"' + city.strip("'") + '"'+","+'"'+airport_code+'"' + "," + longitude +","+ latitude +"\n")
f.close()

csv_conv='/home/n0m3rcy/Desktop/Mahesh/csvtojsonPython/Large.csv'        
with open(csv_conv) as cvs:
    converter = csv.reader(cvs,quotechar="'")
    #url1 = "http://localhost:9200/upflights/_doc"  + '"' +  " -H " + "'Content-Type: application/json'" + ' -d'
    print "["
    for row in converter:
        
        appending = '{' '"Airport_code": ' + row[2] + ',' +'"location1": ' +'"'+row[0] + '"' + ',' + '"Origin_City": ' +row[1] + ',' + '"Combined": ' + '"' + row[1].strip('"') +' ('+row[2].strip('"') + ')' + '"'+ ','+ '"mapboxlocation": '+'"[' + row[3] +','+ row[4] + ']"'+'},' 
        
        
        print( appending )
    print "]" 
        

        #long then LAT '"location": [ 'longitude ',' latitude ']' +