# lovelace-gulp-watch

![screenshot](screenshot.png)

Automatically update the modified date on ui-lovelace.yaml when another lovelace file changes. This is useful if you prefer splitting your lovelace config into multiple files with the use of !include, because HomeAssistant will not refresh the UI unless ui-lovelace.yaml is modified.


This tool runs in the background and watches for changes in a configurable location(s), and touches ui-lovelace.yaml when triggered. This way you don't have to jump into the file and make a dummy save every time you change a sub-view!

## *New*

Added support for [lovelace dashboards](https://www.home-assistant.io/lovelace/dashboards-and-views/)

## Installation

1. Install [node.js](https://nodejs.org/en/)

2. Install gulp globally

    ```
    > npm install -g gulp
    ```

3. Clone the repo if you haven't already

    ```
    > git clone https://github.com/akmolina28/lovelace-gulp-watch.git
    ```
    
4. Install node packages (in the clone directory)

    ```
    > npm install
    ```
    
5. Edit config.json to set up the watch path and the ui-lovelace.yaml path. Alternatively, you can set up a symlink named config, and then you don't have to change the config file.

    Here is how I set up the symlink in windows, with HA available using Samba share:

    ```
    > mklink /D config \\192.168.1.53\config
    ```
    
6. Start the process

    ```
    gulp watch
    ```

## config.json examples

* Default configuration
```
{
  "watch_path": ["./config/lovelace/**/*.yaml"],
  "ui_lovelace_path": "./config/ui-lovelace.yaml"
}
```
This config will watch for changes to all YAML files in the config folder (recursive), and it will touch the ui-lovelace.yaml file.

* Dashboard config
```
{
  "dashboards": [
    {
      "watch_path": ["./config/lovelace/views/my-dashboard-1/**/*.yaml"],
      "dashboard_path": "./config/my-dashboard-1.yaml"
    },
    {
      "watch_path": ["./config/lovelace/views/my-dashboard-2/**/*.yaml"],
      "dashboard_path": "./config/my-dashboard-2.yaml"
    }
  ]
}
```
This config watches for multiple lovelace dashboards. Changes to any YAML files in the /config/lovelace/views/my-dashboard-1/ folder will update /config/my-dashboard-1.yaml. The same follows for my-dashboard-2. Each dashboard gets its own watch folder.

* Note that you can use `watch_path` and `dashboards` together, but you must define at least one of the two.
