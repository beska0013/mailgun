import * as dotenv from 'dotenv/config';

console.log(dotenv.parsed);


const optionsInit = {
      method: 'GET',
      credentials: 'same-origin',
      redirect: 'follow',
      agent: null,
      headers: {
          "Content-Type": "aplication/json",
          'Authorization': 'Basic ' + btoa(`${process.env.API_KEY}`),
      },
      timeout: 5000
  }


async function getDomains () {
    return await fetch('https://api.mailgun.net/v4/domains', optionsInit).then(async res => await res.json())
}

getDomains().then( res =>  showDomains(res));


async function getLists(){
    return await fetch('https://api.mailgun.net/v3/lists', optionsInit).then(async res => await res.json())
}

getLists().then(res => showLists(res))

async function getTemplates(){
    return await fetch('https://api.mailgun.net/v3/mail.howitreat.md/templates', optionsInit).then(async res => await res.json())
}

getTemplates().then(res =>  showTemplates(res));

function showLists(data){
    const mailingList = document.getElementById('mailList');
    let optionsTag = '';
    data.items.forEach( item =>{
        optionsTag += `
        <option value=${item.address}>${item.address}</option>
        `
    })
    mailingList.innerHTML = optionsTag;
}

function showTemplates(data){
    const mailTemplates = document.getElementById('templates');
    let optionsTag = '';
    data.items.forEach( item =>{
        optionsTag += `
        <option value=${item.name}>${item.name}</option>
        `
    })
    mailTemplates.innerHTML = optionsTag;
}

function showDomains(data){
    console.log(data);
    const domainList = document.getElementById('domList');
    let listItem = '';
    data.items.forEach( item =>{
        listItem += `<li title=${item.name}>${item.name}</li>`

    })
    domainList.innerHTML = listItem
}
