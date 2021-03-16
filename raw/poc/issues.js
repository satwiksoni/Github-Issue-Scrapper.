let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let path=require("path");

let url="https://github.com/szcf-weiya/ESL-CN/issues"

function temp(url)
{
    console.log(url);
    request(url,cb);
}
function cb(err,content,html)
{
    if(err)
    {
        console.log("ssdwdwdwdwfwfwfwefefeff");
    }
    
    let $=cheerio.load(html);
    let arr=[];
    //let issues=$(".Box-row.Box-row--focus-gray.p-0.mt-0.js-navigation-item.js-issue-row.navigation-focus")
    let issues=$(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open") 
    console.log(issues.length);
    for(let i=0;i<issues.length;i++)
    {
        let link="https://github.com/"+$(issues[i]).attr("href");
        let issue=$(issues[i]).text();
        let oneObj={
            "Issue":issue,
            "Link":link
        }
        arr.push(oneObj);
    }
    console.table(arr);

}

module.exports={
    issueCB:temp
}