import Swal from 'sweetalert2'

const swalAlert = ({ title,text,confirmButtonText = "Aceptar",width = "375px",timer = 10000, timerProgressBar = true }) => {
    Swal.fire({
        title,
        text,
        confirmButtonText,
        width,
        timer,
        timerProgressBar
    })
};

export default swalAlert;