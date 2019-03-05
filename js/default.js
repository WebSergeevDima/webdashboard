tinymce.init({
  // document_base_url: "/",
  relative_urls: false,

  selector: "textarea",
  language: "ru",
  file_browser_callback: "filebrowser",
  plugins:
    "preview searchreplace autolink directionality visualblocks visualchars fullscreen image media table charmap hr insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern",
  toolbar:
    "fontsizeselect | formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat",
  image_advtab: true,

  file_browser_callback: function(field, url, type, win) {
    tinyMCE.activeEditor.windowManager.open(
      {
        file:
          "components/tinymce/plugins/kcfinder/browse.php?opener=tinymce4&field=" +
          field +
          "&type=" +
          type,
        title: "KCFinder",
        width: 700,
        height: 500,
        inline: true,
        close_previous: false
      },
      {
        window: win,
        input: field
      }
    );
    return false;
  }
});

$(document).ready(function() {
  $('[data-sidebar="nav"] a').each(function() {
    if (this.href == location.href) {
      $(this).addClass("active");
    }
  });

  function winWidth() {
    $("#input-sidebar-burger").attr("checked", false);
    if (
      window.innerWidth < 768 ||
      document.documentElement.clientWidth < 768 ||
      $(window).width() < 768
    ) {
      $('[data-header="sidebar"]').addClass("d-none");
      $('[data-sidebar="nav"]').addClass("d-none");
      $('[data-sidebar="container"]').removeClass("sidebar-small");
    } else {
      $('[data-sidebar="nav"]').removeClass("d-none");
      $('[data-header="sidebar"]').removeClass("d-none");
    }
  }

  window.onresize = function() {
    winWidth();
  };
  winWidth();

  $(document).on("click", '[data-header="sidebar-link"]', function() {
    $('[data-header="sidebar-link"]').removeClass("d-none");
    $(this).addClass("d-none");
    $('[data-sidebar="container"]').toggleClass("sidebar-small");
    var options = { path: "/", expires: 365 };
    if ($.cookie("sidebar-small") == "true") {
      $.cookie("sidebar-small", "false", options);
    } else {
      $.cookie("sidebar-small", "true", options);
    }
  });

  $(document).on("click", '[data-sidebar="burger"]', function() {
    $('[data-sidebar="nav"]').toggleClass("d-none");
  });

  if ($.cookie("sidebar-small") == "true") {
    $('[data-header="sidebar-link"].d-none').addClass("jsclass");
    $('[data-header="sidebar-link"]').addClass("d-none");
    $(".jsclass").removeClass("d-none");
    $(".jsclass").removeClass("jsclass");
    $('[data-sidebar="container"]').addClass("sidebar-small");
  }
});
