module.exports = {
    getYYYYMMDD: (mdFileName) => {
        let date = null;
        if(mdFileName) {
            const format = mdFileName.substring(1, 5) + "-" + mdFileName.substring(5, 7) + "-" +mdFileName.substring(7, 9);
            date = new Date(format);
        }else{
            date = new Date();
        }

        const yyyy = date.getFullYear();
        const mm = ("00" + (date.getMonth()+1)).slice(-2);
        const dd = ("00" + (date.getDate())).slice(-2);
        const day = [ "日", "月", "火", "水", "木", "金", "土" ][date.getDay()] 

        return {"yyyy": yyyy, "mm": mm, "dd": dd, "day": day};
    }
}
