export class DateUtil{
    static dateFormattedWithTimezone(timestamp: number): string{
        var theDate = new Date(timestamp * 1000);
        var fullYear = theDate.getFullYear().toString()
        var date = theDate.toDateString().replace(' '+fullYear,'')
        var hours = theDate.getHours()
        var minutes = theDate.getMinutes()
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        var minutesString = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutesString + ' ' + ampm;
        var timezone = String(String(theDate).split("(")[1]).split(")")[0]
        var dateString = date+', '+strTime+' '+timezone
        return dateString
    }
}