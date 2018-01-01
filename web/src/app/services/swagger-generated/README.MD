# Services

This is where client service generated from swagger documentation resides

#Set up environment for generating the swagger client
- run command 'npm install angular2-swagger-client-generator' to install package required

it will generate file named generator.js


#Updating swagger client
- Update swagger json with latest json text
- open command prompt from directory where to generate the swagger client
- run command 'node a2apigen -s ./swagger.json -o ./ -a ApiClientService'
- it will generate necessary models and swagger client in current folder with specified service Name. Other wise it will generate service file with default value i.e. apiClientService



