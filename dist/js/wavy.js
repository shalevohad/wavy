let innerWavyClassName = "__wavy";
let classArray = [];
function wavy(classArr, eachChar = true) {
  console.log("Wavy 0.0.1 started!");
  classArray = classArr;
  let selectorText = "";
  let number = 1;
  classArr.forEach(cls => {
    selectorText += "." + cls;

    if (classArr.length > number) {
      selectorText += ", ";
    }

    number++;
  });

  wrapEachStr($(document).find(selectorText), 'span', eachChar)
}

function wrapEachStr(domText, htmlWrapper, countWraper = false) {
  jQuery.each(domText, function () {
    domElement = $(this);

    // get Wavy Classname
    let className = innerWavyClassName;
    let wavyDataDirName = 'data-wavyDir';
    let wavydir = domElement.attr(wavyDataDirName);
    switch (wavydir) {
      case 'down':
      case 'up':
        className += wavydir;
        break;
      default:
        className += "up";
    }
    domElement.removeAttr(wavyDataDirName);

    // strip html from inner text
    let text = strip(domElement.html());

    // split words in the text
    wordsArray = text.split(" ");
    let number = 1;
    let newText = "";
    wordsArray.forEach(word => {
      // split word into chars
      innerArray = word.split("");
      innerArray.forEach(str => {
        newText += "<" + htmlWrapper;
        if (countWraper) {
          newText += " style='--i:" + number + "'";
        }

        // add class 'delimiter' for & sign
        if (str == "&") {
          newText += " class='delimiter'>" + str;
        }
        else {
          newText += ">" + str;
        }

        newText += "</" + htmlWrapper + ">";
        number++;
      });

      // add the spaces in the new text between each word
      newText += " ";
    });

    // remove all wavy class list
    classArray.forEach(element => {
      domElement.removeClass(element);
    });

    // add new class to initiate wavy animation with css
    domElement.addClass(className);

    // replace the original text with new wrapped text in the original div
    domElement.html(newText);
  });
}

function strip(html) {
  let doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}