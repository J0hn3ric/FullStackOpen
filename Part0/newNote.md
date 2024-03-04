```mermaid
sequenceDiagram;
    partecipant browser;
    partecipant server;

    browser-->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note;
    activate server
    Note left of server: server handles new_note and handles notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser-->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser-->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "hi", "date": "2024-03-..." }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes



```