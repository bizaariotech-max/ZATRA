import Swal from 'sweetalert2';


export const Popup = (attr, title, description, timer) => {
    switch (attr) {
        case 'success':
            Swal.fire({
                title: title ? title : 'success',
                html: description,
                imageUrl: 'https://cdn-icons-png.flaticon.com/512/7518/7518748.png',
                imageHeight: 100,
                timer: timer,
                timerProgressBar: true,
                width: 400,
            });
            break;

        case 'warning':
            return Swal.fire({
                title: title ? title : 'Warning',
                html: description,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",  // ✅ blue confirm
                cancelButtonColor: "#d33",      // ✅ red cancel
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
                width: 400,
                customClass: {
                    confirmButton: "swal2-confirm-custom",
                    cancelButton: "swal2-cancel-custom",
                }
            });


        case 'error':
            Swal.fire({
                width: 400,
                title: title ? title : 'Something Went Wrong Check your Network Connection',
                html: description,
                timer: timer,
                timerProgressBar: true,
                imageUrl: 'https://cdn-icons-png.flaticon.com/512/2581/2581801.png',
                imageHeight: 100,
            });
            break;
        default:
            return null;
    }
};