const fs = require('fs')
var csvjson = require('csvjson');

const SymbolListMock = require('./mockdata/symbol-list')
let baseDirectory = "./mockdata/";

class LoadData {
    constructor() {
        this.symbolList = [];
        this.originalSymbolList=[];
    }

    _prepareSymbolListData() {
        // let extractionCSVFilePath = baseDirectory + "symbol-data.csv";
        // let csvDataString = fs.readFileSync(extractionCSVFilePath, {encoding: 'utf8'});
        // let jsonArray = csvjson.toObject(csvDataString);
        let jsonArray = SymbolListMock;
        let filtered = jsonArray.filter(oData => {
            return (
                oData.Sector === "Technology" &&
                oData.MarketCap.includes("B") &&
                Number(oData.MarketCap.slice(0,-1).slice(1)) > 10
            )
        })

        this.originalSymbolList = filtered;
        this.symbolList = filtered.map((oData, i)=>{
            return {
                id: oData.Symbol,
                symbol: oData.Symbol,
                name: oData.Name
            }
        })
    }

    prepareData(){
        this._prepareSymbolListData();
    }

}

module.exports=LoadData