<?php
/**
 * It is the controller which controls the sub-directory for
 * the Access portal.
 */
class Access
{
    /**
     * The request uniform resource information of the hypertext
     * transfer protocol.
     * @var string $request_uri
     */
    private string $request_uri;

    public function __construct() {
        $name = get_class($this);
        $portal_address = "/{$name}";
        $this->setRequestUri(str_replace($portal_address, "", $_SERVER["REQUEST_URI"]));
        echo "<pre>Class Name: {$name}<br />Portal Address: {$portal_address}<br />Route: {$this->getRequestUri()}<br />";
        var_dump($_SERVER);
    }

    public function getRequestUri(): string
    {
        return $this->request_uri;
    }

    public function setRequestUri(string $request_uri): void
    {
        $this->request_uri = $request_uri;
    }
}
