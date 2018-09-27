import csv
import json
import requests
import sys
import argparse
import os, fnmatch

def delete_index(index_name,base_url = "http://localhost",port="9200"):
        url=  base_url+":"+port+"/"+index_name
	del_data = requests.delete(url)

def getIndexname(file_name):
    with open(file_name) as csvfile:
	readCSV = csv.reader(csvfile, delimiter='|')
	
	for row in readCSV:
		
		#print("Country:",row[0],"State: ",row[1],"City",row[2],"College Code",row[8],) )
		
		#rint(row[0]+row[1]+row[2]+row[8])
		#sets the index name as the country, state, city, college code			
		idex_name= row[0]+"-"+ row[1]+ "-" + row[2] + "-" +row[8]
		index_name_1 = idex_name.replace(' ', '')
		index_final = index_name_1.lower()
		#print (index_final)
                break

	return index_final
def getCSVList( dir="."):
    for dName, sdName, fList in os.walk(dir):
        for fileName in fList:
            if fnmatch.fnmatch(fileName, pattern): # Match search string
                fileList.append(os.path.join(dName, fileName))

    return fileList

list = getCSVList("/Users/amars/deleteme")

def create_index(index_name, map_info,base_url="http://localhost",port = "9200" ):
        url=  base_url+":"+port+"/"+index_name
        print map_info
        #map_data = requests.put(url = url, data=map_info)
        map_data = requests.put(url = url, data=json.dumps(map_info))
	print map_data.text
def insert_record(index_name,key_val,es_type="data",  base_url = "http://localhost",port="9200"):
        #key_val['Primeminster']="Modi";
        url=  base_url+":"+port+"/"+index_name + "/" + es_type
	url1 = base_url+":"+port+"/"+index_name + "/" + es_type +"/"
	ins_kv = requests.post(url= url1, data = json.dumps(key_val))
	#print ins_kv.text
        #map_data = requests.post(url = url, data=json.dumps(map_info))
	#print map_data
		

def bulk_insert_csv(index_name,es_type, csv_name, base_url = "http://localhost",port="9200" , batch_size=10  ) :
    final_bulk_list=[]
    line="\n"
    url1 = base_url+":"+port+"/"+index_name + "/" + es_type +"/_bulk"
    j=0
    with open(csv_name) as csvfile:
	   readCSV = csv.reader(csvfile, delimiter='|')
           i = 0
	   for row in readCSV:
                i=i+1
    		#with args.json_body as file:
			#print file.read()
                index_body= { "index":{} }
                json_body= {
                        "Country".title(): row[0].title(),
                        "State".title(): row[1].title(),
                        "District".title(): row[2].title(),
                        "City".title(): row[3].title(),
                        "Town".title(): row[4].title(),
                        "Village".title(): row[5].title(),
                        "Pin_Code".title(): row[6].title(),
                        "Full_Name".title(): row[7].title(),
                        "Short_Name".title(): row[8].title(),
                        "Branch".title(): row[11].title(),
                        "Name_of_the_company".title(): row[12].title(),
                        "Date".title(): row[13].title(),
                        "Batch".title(): row[14].title(),
                        "Salary_Package".title(): row[15].title(),
                        "Currency".title(): row[16].title(),
                        "No_Of_Rounds_Of_Interview".title(): row[17].title(),
                        "Number_Of_Student_Placed".title(): row[18].title(),
                        "Location".title(): row[20].title(),
                        "Interview_Duration".title(): row[21].title(),
                        "Designation".title(): row[22].title(),
                        "English_Fluency_Level".title(): row[23].title(),
                        "Authorised_Data".title(): row[24].title(),
                        "Longitude".title(): row[25].title(),
                        "Name_of_the_Candidate".title(): row[10].title(),
                        "Latitude".title(): row[26].title(),
                        "Roll_Number".title(): row[9].title(),
                        "Website".title(): row[19].title()
                } 
                line=line + str(index_body) + "\n" + str(json_body) +"\n"
                if i == batch_size:
                    i=0
                    j=j+1
                    print "We are insrting batch number ", j
                    #print line
                    line = line + "\n" 
                    line=line.replace("'",'"')
                    headers = {'Content_Type': 'application/json'}
                    ins_kv = requests.post(url= url1, data = line , headers=headers)
                    #ins_kv = requests.post(url= url1, data = json.dumps(line) , headers=headers)
                    #print ins_kv.text
                    line="\n"
           print "We are insrting batch number  ( last batch ) ", j+1
           line = line + "\n" 
           line=line.replace("'",'"')
           headers = {'Content_Type': 'application/json'}
           ins_kv = requests.post(url= url1, data = line , headers=headers)
           #ins_kv = requests.post(url= url1, data = json.dumps(line) , headers=headers)
           #print ins_kv.text
     

def insert_csv(index_name,es_type, csv_name, base_url = "http://localhost",port="9200" ) :

    with open(csv_name) as csvfile:
	   readCSV = csv.reader(csvfile, delimiter='|')
	   for row in readCSV:
    		#with args.json_body as file:
			#print file.read()
                json_body= {
                        "Country".title(): row[0].title(),
                        "State".title(): row[1].title(),
                        "District".title(): row[2].title(),
                        "City".title(): row[3].title(),
                        "Town".title(): row[4].title(),
                        "Village".title(): row[5].title(),
                        "Pin_Code".title(): row[6].title(),
                        "Full_Name".title(): row[7].title(),
                        "Short_Name".title(): row[8].title(),
                        "Branch".title(): row[11].title(),
                        "Name_of_the_company".title(): row[12].title(),
                        "Date".title(): row[13].title(),
                        "Batch".title(): row[14].title(),
                        "Salary_Package".title(): row[15].title(),
                        "Currency".title(): row[16].title(),
                        "No_Of_Rounds_Of_Interview".title(): row[17].title(),
                        "Number_Of_Student_Placed".title(): row[18].title(),
                        "Location".title(): row[20].title(),
                        "Interview_Duration".title(): row[21].title(),
                        "Designation".title(): row[22].title(),
                        "English_Fluency_Level".title(): row[23].title(),
                        "Authorised_Data".title(): row[24].title(),
                        "Longitude".title(): row[25].title(),
                        "Name_of_the_Candidate".title(): row[10].title(),
                        "Latitude".title(): row[26].title(),
                        "Roll_Number".title(): row[9].title(),
                        "Website".title(): row[19].title()
                } 

	   	insert_record(index_name = index_name ,es_type = es_type, key_val = json_body)
	   	#print insert_record

def file_exists(fname):
        if os.path.isfile(fname):
                return
        else:
                print 'file', fname, ' doesnt exist, it is a mandatory file.'
                sys.exit(-1)


if __name__ == "__main__" :

    parser = argparse.ArgumentParser()
    parser.add_argument('-m','--map_info', action= 'store', dest='map_file', help='Specify the map file for index in elasticsearch', required=True)
    parser.add_argument('-c','--csv', action= 'store', dest='csv_name', help='CSV file with "|" as seperator - it is the file which will have the records to be inserted', required=True)
    parser.add_argument('-s','--batch_size', action= 'store', dest='batch_size', help='Specify batch size - number of records you want to insert in one shot', required=True)

    parser.add_argument('-d','--dir', action = 'store', dest= 'path_name',help = 'Specify the path which includes the csv files', required = True)

    results = parser.parse_args()
    path_name = results.path_name 
    csv_name=results.csv_name
    map_info=results.map_file
    batch_size=int(results.batch_size)
    #map_info_file=open(map_info,"r")
    with open(map_info, 'r') as f:
        datastore = json.load(f)
    map_info_content=datastore
    

    #print map_info_content
    #sys.exit()
    print map_info , csv_name

    file_exists(map_info)
    file_exists(csv_name)
    index_name=getIndexname(csv_name)
    print index_name
    delete_index(index_name=index_name)
    create_index(map_info = map_info_content ,index_name = index_name)
    bulk_insert_csv(index_name = index_name,es_type="data",  csv_name = csv_name, batch_size = batch_size)
    print insert_csv