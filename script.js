const allTag = (rootElement) => {
  let tags = [],
    counts = {};

  const explore = (element) => {
    for (const child of element.children) {
      tags.push(child.nodeName);
      explore(child);
    }
  };

  explore(rootElement);

  const getWordCnt = (arr) => {
    return arr.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});
  };

  counts = getWordCnt(tags);

  const sortCounts = (obj) => {
    let sortedEntries = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    // return Object.fromEntries(sortedEntries);
    return sortedEntries
  };

  return sortCounts(counts);
};

const tagCounts = allTag(document.body);
const sortedKeys = tagCounts.map((entry) => entry[0].toLowerCase());
console.log(sortedKeys);

const rouge = (tag)=>{
  let f = document.querySelectorAll(tag);
  for (const tags of f){
    tags.classList.add("red");
  }
}

// Create a table for displaying results
const createTable = (data) => {
  let table = document.createElement("table");
  table.style.border = "1px solid black";
  table.style.borderCollapse = "collapse";
  table.style.width = "50%";

  let headerRow = table.insertRow();
  let tagHeader = headerRow.insertCell(0);
  let countHeader = headerRow.insertCell(1);
  let buttonHeader = headerRow.insertCell(2);

  tagHeader.textContent = "Tag Name";
  countHeader.textContent = "Count";
  buttonHeader.textContent = "Click";


  tagHeader.style.border = countHeader.style.border  = "1px solid black";
  tagHeader.style.padding = countHeader.style.padding = "5px";
  tagHeader.style.fontWeight = countHeader.style.fontWeight = buttonHeader.style.fontWeight = "bold";

  for (let [tag, count] of (data)) {
    let row = table.insertRow();
    let tagCell = row.insertCell(0);
    let countCell = row.insertCell(1);
    let buttonCell = row.insertCell(2);

    tagCell.textContent = tag;
    countCell.textContent = count;
    buttonCell.innerHTML = "<button> Trouvé </button>"
    buttonCell.addEventListener("click", () => rouge(tag))

    tagCell.style.border = countCell.style.border = buttonCell.style.border = "1px solid black";
    tagCell.style.padding = countCell.style.padding = buttonCell.style.border = "5px";
  }

 // document.body.appendChild(table);
  document.body.insertAdjacentHTML("afterbegin", table.outerHTML);
};

// Display the table
createTable(tagCounts);