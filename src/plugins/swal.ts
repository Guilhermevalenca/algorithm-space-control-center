import sweetalert2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const swal = withReactContent(sweetalert2);

export const swalPlugin = swal.mixin({
  showConfirmButton: false,
});
