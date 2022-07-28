<?php
if (
    isset($_POST['name']) && isset($_POST['email']) && isset($_POST['phone'])
    && isset($_POST['company']) && isset($_POST['message'])
) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $company = $_POST['company'];
    $message = $_POST['message'];

    if (!preg_match("/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/", $email)) {
        header("Location: ./index.php");
        die;
    }

    if (!preg_match("/^(\+91-|\+91|0)?\d{10}$/", $phone)) {
        header("Location: ./index.php");
        die;
    }
} else {
    header("Location: ./index.php");
    die;
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="stylesheet" href="./css/infor.css">
    <title>Message Information</title>
</head>

<body>
    <div class="container p-5">
        <div class="mb-5">
            <h1 class="infor-color-main">Thank you for contacting us</h1>
        </div>
        <div class="mb-5">
            We will be back in touch with you within one business day using the information you just provided below:
        </div>
        <div class="mb-5">
            <div class="d-flex mb-2">
                <div class="infor-title"><b>Name:</b></div>
                <?= '<div>' . $name . '</div>' ?>
            </div>
            <div class="d-flex mb-2">
                <div class="infor-title"><b>Phone:</b></div>
                <?= '<div>' . $phone . '</div>' ?>
            </div>
            <div class="d-flex mb-2">
                <div class="infor-title"><b>Email Address:</b></div>
                <?= '<div><a href="">' . $email . '</a></div>' ?>
            </div>
            <div class="d-flex mb-2">
                <div class="infor-title"><b>Company:</b></div>
                <?= '<div>' . $company . '</div>' ?>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
</body>

</html>