const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector('form');
const baseURL = "http://localhost:3000";

async function load() {
    const res = await fetch(baseURL).then(data => data.json());

    res.urls.map(url => addElement(url));
}

function addElement({ name, url }) {
    const li = document.createElement('li');
    const a = document.createElement("a");
    const trash = document.createElement("span");

    a.href = url;
    a.innerHTML = name;
    a.target = "_blank";

    trash.innerHTML = "x";
    trash.onclick = () => removeElement(trash, name, url);

    li.append(a);
    li.append(trash);
    ul.append(li);
}

function removeElement(el, name, url) {
    if (confirm('Tem certeza que deseja deletar?')){
        deleteUrl(name, url);
        el.parentNode.remove();
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input;

    if (!value) {
        return alert('Preencha o campo');
    }

    const [name, url] = value.split(",");

    if (!url) {
        return alert('formate o texto da maneira correta');
    }

    if (!/^http/.test(url)) {
        return alert("Digite a url da maneira correta");
    }

    addUrl(name, url);
    addElement({ name, url });

    input.value = "";
})

async function addUrl(name, url) {
    const res = await fetch(`${baseURL}/?name=${name}&url=${url}`).then(response => response.json());

    console.log(res);
}

async function deleteUrl(name, url){
    await fetch(`${baseURL}/?name=${name}&url=${url}&del=1`);
}

load();