// helpful link for converting image to base64: https://elmah.io/tools/base64-image-encoder/
async function apiFetch(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const getData = async () => {
  /*const data = await apiFetch('http://localhost:8080/api/users');*/

  const data = await apiFetch(`http://localhost:8080/api/users?t=${Date.now()}`);

   //for debugging purposes
  //console.log("Data received from API:", data);

  if (Array.isArray(data) && data.length > 0) {
    console.log("First user object:", data[0]);
    displayAllData(data[0]); //Use the first user object
  } else {
    console.warn("⚠️ No user data found.");
  }
};

function displayAllData(data) {
  displayProfessionalName(data.professionalName);
  displayImage(data.base64Image);
  displayPrimaryDescription(data);
  displayWorkDescription(data);
  displayLinkTitleText(data);
  displayLinkedInLink(data);
  displayGitHubLink(data);
  //displayContactText(data);
}

function displayProfessionalName(n) {
  let professionalName = document.getElementById('professionalName');
  professionalName.innerHTML = n;
}

function displayNameLink(user) {
  const nameLink = user.nameLink;

  if (nameLink && nameLink.firstName && nameLink.url) {
    // use it normally
    const nameLinkEl = document.getElementById('nameLink');
    nameLinkEl.innerHTML = `<a href="${nameLink.url}" target="_blank">${nameLink.firstName}</a>`;
  } else {
    console.warn("nameLink is missing, using fallback.");
    const nameLinkEl = document.getElementById('nameLink');
    nameLinkEl.textContent = user.professionalName || "No name available";
  }
}

function displayImage(img) {
  let image = document.getElementById('professionalImage');
  image.src = `data:image/jpg;base64, ${img}`;
}

function displayPrimaryDescription(data) {
  const nameLink = document.getElementById('nameLink');

  if (data.nameLink?.firstName && data.nameLink?.url) {
    nameLink.innerHTML = data.nameLink.firstName;
    nameLink.href = data.nameLink.url;
  } else {
    console.warn("nameLink is missing, using fallback.");
    nameLink.innerHTML = data.professionalName;
    nameLink.href = data.linkedInLink?.link || "#";
  }

  const primaryDescription = document.getElementById('primaryDescription');
  primaryDescription.innerHTML = data.primaryDescription;
}

function displayWorkDescription(data) {
  //debugging 
  //console.log("workDescription1 from DB:", data.workDescription1);
  let workDescription1 = document.getElementById('workDescription1');
  workDescription1.innerHTML = data.workDescription1;
  let workDescription2 = document.getElementById('workDescription2');
  workDescription2.innerHTML = data.workDescription2;
}

function displayLinkTitleText(data) {
  let linkTitle = document.getElementById('linkTitleText');
  linkTitle.innerHTML = data.linkTitleText;
}

function displayLinkedInLink(data) {
  let linkedInLink = document.getElementById('linkedInLink');
  linkedInLink.innerHTML = data.linkedInLink.text;
  linkedInLink.href = data.linkedInLink.link;
}

function displayGitHubLink(data) {
  let githubLink = document.getElementById('githubLink');
  githubLink.innerHTML = data.githubLink.text;
  githubLink.href = data.githubLink.link;
}

getData();