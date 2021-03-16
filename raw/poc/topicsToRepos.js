let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let path=require("path");
let issueCB=require("./issues.js");
 
let url="https://github.com/topics";
request(url,cb);
function cb(err,content,html)
{
    let $=cheerio.load(html);
    let ThreeBoxes=$(".col-12.col-sm-6.col-md-4.mb-4");
    //.f3.lh-condensed.text-center.Link--primary.mb-0.mt-1
    console.log(ThreeBoxes.length)
    
        let h3=$(ThreeBoxes);
        console.log(h3.length);
        for(let i=0;i<h3.length;i++)
        {
            let link="https://github.com"+$(h3[i]).find(".no-underline.d-flex.flex-column.flex-justify-center").attr("href");
            let name=$(h3[i]).find(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1").text().trim();
            console.log(name+"  "+link);
            request(link,cb1);
        }

}
function cb1(err,data,html)
{
    let $=cheerio.load(html);
    let name=$(".h1-mktg").text().trim();

    if(!fs.existsSync(path.join(process.cwd(),name)))
    fs.mkdirSync(path.join(process.cwd(),name));

    let allBoxes=$(".border.rounded.color-shadow-small.color-bg-secondary.my-4")
    console.log(allBoxes.length);
    for(let i=0;i<8;i++)
    {
        let Tab=$(allBoxes[i]).find(".text-bold").text().trim();
        let oneBoxLink="https://github.com"+$(allBoxes[i]).find(".text-bold").attr("href");
        let fileName=oneBoxLink.split("/").pop();
        MakeJsonFile(fileName, path.join(process.cwd(),name) );
        let issueLink=oneBoxLink+"/issues";
        issueCB.issueCB(issueLink);
        //request(oneBoxLink+"/issues",issuesCB);
        //console.log(Tab);   
      //  console.log(oneBoxLink);
   //    console.log("---------------------------------");
    }
}



function MakeJsonFile(name,path1)
{
    let pt=path.join(path1,name+".json");
    if(!fs.existsSync(pt))
        fs.openSync(pt,"w");
}
