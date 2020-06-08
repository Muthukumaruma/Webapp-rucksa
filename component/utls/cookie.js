const WriteCookie = (key, value, hours) => {
  var date = new Date();

  // Get milliseconds at current time plus number of hours*60 minutes*60 seconds* 1000 milliseconds
  date.setTime(+date + hours * 3600000); //60 * 60 * 1000

  window.document.cookie =
    key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";

  return value;
};

const GetCookie = c_name => {
  var c_value = " " + document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
    c_value = null;
  } else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start, c_end));
  }
  return c_value;
};

const onRemoved = cookie => {
  console.log(`Removed: ${cookie}`);
};

const onError = error => {
  console.log(`Error removing cookie: ${error}`);
};

const removeCookie = tabs => {
  var removing = browser.cookies.remove({
    url: tabs[0].url,
    name: "favourite-colour"
  });
  removing.then(onRemoved, onError);
};

export { WriteCookie, GetCookie, removeCookie };
