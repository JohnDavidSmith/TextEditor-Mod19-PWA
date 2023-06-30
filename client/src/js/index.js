
import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import { header } from './header';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};


const editorContainer = document.createElement('div');
editorContainer.classList.add('editor-container');

// Display the header content inside the editor with line numbers
const headerContainer = document.createElement('div');
headerContainer.classList.add('header');

// Split the header content into lines
const lines = header.split('\n');

// Create a pre element to hold the header lines with line numbers
const headerPre = document.createElement('pre');
headerPre.classList.add('header-pre');

// Iterate over the lines and create spans with line numbers
lines.forEach((line, index) => {
  const lineNumber = document.createElement('span');
  lineNumber.classList.add('line-number');
  lineNumber.textContent = `${index + 1}: `; // Line numbers start from 1
  
  const lineText = document.createTextNode(line);
  
  const lineContainer = document.createElement('div');
  lineContainer.appendChild(lineNumber);
  lineContainer.appendChild(lineText);
  
  headerPre.appendChild(lineContainer);
});

headerContainer.appendChild(headerPre);
editorContainer.appendChild(headerContainer);

main.appendChild(editorContainer);

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

