// document.addEventListener('DOMContentLoaded', () => {
//     const courseInfoBtn = document.getElementById("Math 9");
//     courseInfoBtn.addEventListener('click', () => {
//         fetchStudentsByCourse(courseInfoBtn.id);
//     });
// });

// async function fetchStudentsByCourse(course) {
//     try {
//         const response = await fetch('http://localhost:2001/students/accepted/course');
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || 'Server error');
//         }

//         const allStudents = await response.json();

//         // Filter students by the provided course
//         const filteredStudents = allStudents.filter(student => student.Course === course);

//         // Store filtered student data in local storage after stringifying it
//         localStorage.setItem('courseInfo', JSON.stringify(filteredStudents));

//         // Redirect to the next page
//         window.location.href = './GradeDetails/courseinfo.html';
//     } catch (error) {
//         console.error('Error fetching student data:', error);
//         // Handle error here (e.g., display error message on the UI)
//     }
// }
document.addEventListener('DOMContentLoaded', () => {
    // Lấy tất cả các nút "View" trong bảng
    const courseInfoBtns = document.querySelectorAll('.btn.btn-primary');

    // Gắn sự kiện click cho từng nút
    courseInfoBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            // Lấy ID của nút được nhấn
            const courseId = event.target.id;
            fetchStudentsByCourse(courseId);
        });
    });
});

async function fetchStudentsByCourse(course) {
    try {
        const response = await fetch('http://localhost:2001/students/accepted/course');
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Server error');
        }

        const allStudents = await response.json();

        // Lọc sinh viên theo khóa học được cung cấp
        const filteredStudents = allStudents.filter(student => student.Course === course);

        // Lưu dữ liệu sinh viên đã lọc vào localStorage sau khi chuyển đổi thành chuỗi JSON
        localStorage.setItem('courseInfo', JSON.stringify(filteredStudents));

        // Chuyển hướng tới trang tiếp theo
        window.location.href = './GradeDetails/courseinfo.html';
    } catch (error) {
        console.error('Error fetching student data:', error);
        // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo lỗi trên giao diện)
    }
}
