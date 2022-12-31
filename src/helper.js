// Import modules
// import { formatDistanceToNow } from "date-fns";
import $ from "jquery";

const helper = {
  // Open and close side menu
  openAndCloseSideMenu() {
    document.body.classList.toggle("open");
  },
  // function to remove form validation classes
  removeFormValidationClasses() {
    $(".task-field").removeClass("is-invalid");
  },
};

export default helper;
