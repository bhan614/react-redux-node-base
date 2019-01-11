const { SERVER_URL } = require('../config');

const apiUrl = {
  fileUpload: `${SERVER_URL}task/admin/uploadFile`,
  fileDownload: `${SERVER_URL}file-download`,
};

module.exports = apiUrl;
