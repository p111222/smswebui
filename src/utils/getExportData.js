const getExportData = (data, columns) =>{
    const filteredData = data.map(obj=> columns.reduce((acc,key)=>{
      if(obj.hasOwnProperty(key)){
        acc[key] = obj[key] || null
      }
      return acc
    },{}))
    return filteredData
}

export default getExportData