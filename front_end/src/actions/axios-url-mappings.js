let URLMapping = function () {
    this.ServerURL="http://localhost:9091/"

    this.GetSymbolList = this.ServerURL+'symbolList';
    this.GetSelectedSymbolData = this.ServerURL+'symbolData';
};

export default new URLMapping();

