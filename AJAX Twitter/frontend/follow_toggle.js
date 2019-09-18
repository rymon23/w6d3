const APIUtil = require('./api_util');

class FollowToggle {
 constructor(el) {
  this.$el = $(el);
  this.user_id = this.$el.data('user-id');
  this.follow_status = this.$el.data('follow-status');
  this.followButtonText = ["Unfollow!", "Follow!"];
  this.render();
  this.handleClick();
 }

 _is_followed(){
   return this.follow_status === "followed";
 }

 _toggleFollowState(){
  this.follow_status = this._is_followed() ? "unfollowed" : "followed"
  return this.render();
 }
 
 _method(){
   return this._is_followed() ? "DELETE" : "POST";
 }

 _updateFollowButtonText(state){
    this.$el.empty();
    this.$el.append(this.followButtonText[state]); 
 }

 _disableButtonClickState(disable = true){
    this.$el.prop("disabled", disable);
 }

 render() {
  this._disableButtonClickState(false);
  let followButtonState = this._is_followed() ? 0 : 1;
  this._updateFollowButtonText(followButtonState);
 }

//  clickAJAX(user_id) {
//     const method = this._method();
//    return $.ajax({
//     method: method,
//     url: `/users/${user_id}/follow`,
//     dataType: "JSON",
//     success: this._toggleFollowState(),
//     errors: () => console.log("ERROR")
//    })
//  }

//EVENT HANDLER
 handleClick() {
    this.$el.click((e) => {
    e.preventDefault();
    this.toggleClick();
   })
 }
 
 //PROMISE
 toggleClick() {
    const successCB = () => this._toggleFollowState();
    this._disableButtonClickState();

   if (this._is_followed()) {
      APIUtil.unfollowUser(this.user_id).then(successCB);
   } else {
      APIUtil.followUser(this.user_id).then(successCB);
   }
 }

}

module.exports = FollowToggle