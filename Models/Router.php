<?php
session_start();
/**
 * The router that will route all the requests to the
 * application.
 */
class Router
{
    /**
     * The request address
     * @var string $route
     */
    private string $route;
    /**
     * The server on which the application is being hosted
     * @var string $root
     */
    private string $root;
    /**
     * The path of the response
     * @var string $path
     */
    private string $path;
    /**
     * The HTTP Status code
     * @var int $status_code
     */
    private int $status_code;
    /**
     * The request method of the HTTP request.
     * @var string $request_method
     */
    private string $request_method;
    /**
     * The current time of the request in UNIX timestamp for the
     * server processing.
     * @var int $current_time
     */
    private int $current_time;
    /**
     * The expiry time of the request in UNIX timestamp for the
     * server processing.
     * @var int $expiry_time
     */
    private int $expiry_time;

    /**
     * Creating the object which takes two parameters to verify the
     * request method and session
     */
    public function __construct()
    {
        $this->setRoot($_SERVER['DOCUMENT_ROOT']);
        $this->setRoute($_SERVER['REQUEST_URI']);
        $this->setRequestMethod($_SERVER['REQUEST_METHOD']);
        $this->initialize();
    }

    public function getRoute(): string
    {
        return $this->route;
    }

    public function setRoute(string $route): void
    {
        $this->route = $route;
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function setPath(string $path): void
    {
        $this->path = $path;
    }

    public function getRoot(): string
    {
        return $this->root;
    }

    public function setRoot(string $root): void
    {
        $this->root = $root;
    }

    public function getStatusCode(): int
    {
        return $this->status_code;
    }

    public function setStatusCode(int $status_code): void
    {
        $this->status_code = $status_code;
    }

    public function getRequestMethod(): string
    {
        return $this->request_method;
    }

    public function setRequestMethod(string $request_method): void
    {
        $this->request_method = $request_method;
    }

    public function getCurrentTime(): int
    {
        return $this->current_time;
    }

    public function setCurrentTime(int $current_time): void
    {
        $this->current_time = $current_time;
    }

    public function getExpiryTime(): int
    {
        return $this->expiry_time;
    }

    public function setExpiryTime(int $expiry_time): void
    {
        $this->expiry_time = $expiry_time;
    }

    /**
     * Initiliazing the router to verify the HTTP request before
     * allowing the server to serve data.
     * @return void
     */
    public function initialize(): void
    {
        $this->setCurrentTime(time());
        $this->setExpiryTime($this->getCurrentTime() + 3600);
        $routes = explode("/", $this->getRoute());
        if ($this->getRoute() == "/") {
            $this->get("/Views/Homepage.php");
            exit;
        } else {
            require_once "{$this->getRoot()}/Controllers/{$routes[1]}.php";
            new $routes[1]();
            exit;
        }
    }

    /**
     * Selecting data from the server
     * @param string $path The path of the view or controller
     * @return void
     */
    public function get(string $path): void
    {
        $this->setPath($path);
        $this->verifyFile();
    }

    /**
     * Verifying that the file exists in order to import it for the
     * server to serve it.
     * @return  void
     */
    public function verifyFile(): void
    {
        $current_time = date("Y-m-d H:i:s", $this->getCurrentTime());
        $expiry_time = date("Y-m-d H:i:s", $this->getExpiryTime());
        if (file_exists("{$this->getRoot()}{$this->getPath()}")) {
            require_once "{$this->getRoot()}{$this->getPath()}";
            $this->setStatusCode(200);
        } else {
            require_once "{$this->getRoot()}/Views/HTTP404.php";
            $this->setStatusCode(404);
        }
        header("Content-Type: text/html; charset=UTF-8", true, $this->getStatusCode());
        header("Date: {$current_time}", true, $this->getStatusCode());
        header("Expires: {$expiry_time}", true, $this->getStatusCode());
        header("Cache-Control: private; max-age=3600", true, $this->getStatusCode());
        header("Server: Mind Blower", true, $this->getStatusCode());
        header_remove("Pragma");
        exit;
    }
}