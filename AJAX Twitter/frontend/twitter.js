const FollowToggle = require("./follow_toggle");

$(()  => {
  // const rootEl()
  const buttons = $(".follow-toggle");
  buttons.each((index, button) => {
    new FollowToggle(button);
  })
})