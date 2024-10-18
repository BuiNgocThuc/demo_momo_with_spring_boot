export const generateInvoiceNumber = (id: number) => {
  const date = new Date();
  const day = ('0' + date.getDate()).slice(-2); // Thêm '0' nếu ngày nhỏ hơn 10
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Thêm '0' nếu tháng nhỏ hơn 10
  const year = date.getFullYear().toString().slice(-2); // Lấy 2 số cuối của năm

  // Định dạng id thành chuỗi tối đa 4 chữ số, thêm số 0 nếu cần
  const formattedId = ('00' + id).slice(-3);

  return `ZT${day}${month}${year}/${formattedId}`;
};

export const formatDateWithSlash = (inputDate?: Date) => {
  // Nếu không truyền ngày vào, sử dụng ngày hiện tại
  const date = inputDate ? new Date(inputDate) : new Date();
  const day = ('0' + date.getDate()).slice(-2); // Thêm '0' nếu ngày nhỏ hơn 10
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Thêm '0' nếu tháng nhỏ hơn 10
  const year = date.getFullYear(); // Lấy năm đầy đủ

  return `${day}/${month}/${year}`;
};