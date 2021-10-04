tinymce.init({
  selector: ".editor",
  plugins: [
    "advlist autolink lists link image charmap print preview hr anchor pagebreak",
    "searchreplace wordcount visualblocks visualchars code fullscreen",
    "insertdatetime media nonbreaking save table directionality",
    "emoticons template paste textpattern",
  ],
  toolbar1: "undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | print preview",
  height: "300px",
  relative_urls: false,
  remove_script_host: false,
});

// plugins: [
//   "advlist autolink lists link image charmap print preview hr anchor pagebreak",
//   "searchreplace wordcount visualblocks visualchars code fullscreen",
//   "insertdatetime media nonbreaking save table contextmenu directionality",
//   "emoticons template paste textcolor colorpicker textpattern"
// ],
// toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
// toolbar2: "print preview media | forecolor backcolor emoticons",
// toolbar: 'undo redo | image code',

// tinymce.init({
//   selector: '#desc',
//   plugins: [
//       "advlist autolink lists link image charmap print preview hr anchor pagebreak",
//       "searchreplace wordcount visualblocks visualchars code fullscreen",
//       "insertdatetime media nonbreaking save table contextmenu directionality",
//       "emoticons template paste textcolor colorpicker textpattern"
//   ],
//   toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
//   toolbar2: "print preview media | forecolor backcolor emoticons",
//   toolbar: 'undo redo | image code',
//   images_upload_url: '<?php echo base_url('Backend/Manajemen_frontend/Other_data/upload_tiny') ?>',
//   height: "300px",
//   relative_urls: false,
//   remove_script_host: false,
//   document_base_url: '',
//   images_upload_handler: function(blobInfo, success, failure) {
//       var xhr, formData;

//       xhr = new XMLHttpRequest();
//       xhr.withCredentials = false;
//       xhr.open('POST', '<?php echo base_url('Backend/Manajemen_frontend/Other_data/upload_tiny') ?>');


//       formData = new FormData();
//       formData.append('file', blobInfo.blob(), blobInfo.filename());

//       xhr.onload = function() {
//           var json;

//           if (xhr.status != 200) {
//               failure('HTTP Error: ' + xhr.status);
//               return;
//           }

//           json = JSON.parse(xhr.responseText);

//           if (!json || typeof json.location != 'string') {
//               failure('Invalid JSON: ' + xhr.responseText);
//               return;
//           }

//           success('<?php echo base_url('upload/tiny') ?>/' + json.location);
//       };

//       xhr.send(formData);
//   },
//   setup: function(ed) {
//       ed.on('NodeChange', function(e) {
//           $('#deskripsi_in').val(ed.getContent())
//       });
//   }
// });
