import csvToJson from 'csvtojson';
// import MapData from "/public/MapData/projects.csv";
// const fs = require('fs')

const data = `student_name,student_id,Institution,project_start_time,project_completion_time,location_coordinates
Atanu,1,Univarsity of Chittagong,4/1/2019,6/30/2023,"(23.729211164246585, 90.40874895549243)"
Sabbir,2,Univarsity of Chittagong,3/26/2022,3/25/2026,"(23.768773179764562, 90.37269632665758)"
Masud,3,Univarsity of Chittagong,6/29/2017,7/28/2022,"(23.728881264793493, 90.40888399782175)"
Mohaimen,4,Univarsity of Chittagong,7/1/2006,6/30/2010,"(23.728881264793493, 90.40888399782175)"
Siam,5,Univarsity of Chittagong,7/1/2011,6/30/2016,"(23.728881264793493, 90.40888399782175)"
Alice,6,Univarsity of Chittagong,7/1/2011,6/30/2016,"(23.728407931193587, 90.40787482665709)"
Bob,7,Univarsity of Chittagong,1/6/2016,6/5/2021,"(23.7284766533655, 90.40910864263893)"
test,8,Univarsity of Chittagong,2/15/2014,10/16/2018,"(23.7284766533655, 90.40910864263893)"
test,9,Univarsity of Chittagong,9/28/2019,9/27/2023,"(23.7708680271343, 90.38098892695923)"
test,10,Univarsity of Chittagong,9/16/2017,12/15/2022,"(23.7284766533655, 90.40910864263893)"
test,11,Univarsity of Chittagong,6/22/2021,1/31/2024,"(23.728917093659554, 90.40956388277749)"
test,12,Univarsity of Chittagong,1/27/2020,12/22/2022,"(23.728917093659554, 90.40956388277749)"`

async function MapDataHandler(){
    // const dir = path.join(process.cwd(), 'public/MapData');
    // const arr = await csvToJson().fromFile(dir + '/projects.csv');
    const arr = await csvToJson().fromString(data);
    
    arr.forEach(row => {
        var temp = row.location_coordinates.split('(')
        temp = temp.filter((item) => {
            return item.length > 0
        })

        for(let i = 0 ; i < temp.length ; i++) {
            temp[i] = temp[i].replaceAll('),', '')
            temp[i] = temp[i].replaceAll(',"', '')
            temp[i] = temp[i].replaceAll(')', '')

            temp[i] = temp[i].split(',')
            temp[i] = {lat: Number.parseFloat(temp[i][0]), long: Number.parseFloat(temp[i][1])}
        }
        row.location_coordinates = temp
    })
    
    return arr;
}

export default MapDataHandler;