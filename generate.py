#!/usr/bin/python3

import sys
import os
import re

plugin_template = """
import { Plugin } from "./plugin";

export class %s extends Plugin {
    constructor() {
        super(%s); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    register(data: any): boolean {
        /**
         * Code to register your plugin
         * Add interval ID to this.registered_intervals using the arrays push method.
         * Add listeneras to this.registered_listeners using the arrays push method.
         * For listeners you need to push an object like so {on: string, function: EventListenerOrEventListenerObject}
         * 
         * Return true is plugin was registered successfully false otherwise
         */
        return true;
    }

    // Optionally you can override the revoke method
    // revoke(): boolean {
    //     return true;
    // }
}
"""

command_template = """
import { Command } from "./command";

export class %s extends Command {
    constructor() {
        super(%s); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: any) {
        // Code for the action
    }
}
"""

def main():
    if (len(sys.argv) != 3 and len(sys.argv) != 4) or (sys.argv[1] != "plugin" and sys.argv[1] != "command"):
        print("Wrong usage of generate command. Please use \"npm run generate plugin/command [name] [id]\"")
        return
    
    name = re.sub(r'(?<!^)(?=[A-Z])', '_', sys.argv[2]).lower()
    
    templates = {
        "plugin": plugin_template,
        "command": command_template
    }

    path = os.path.join(os.getcwd(), "src", sys.argv[1] + "s", name + ".ts")
    
    if os.path.exists(path):
        print("There is already a %s with this name. Please choose another one" % sys.argv[1])
        return

    id = 0
    if len(sys.argv) == 4:
        id = int(sys.argv[3])

    with open(path, "w") as file:
        file.write(templates[sys.argv[1]].strip() % (sys.argv[2] + sys.argv[1].capitalize(), id))

    index_path = os.path.join(os.getcwd(), "src", sys.argv[1] + "s", "index.ts")

    with open(index_path, "r") as file:
        index_lines = file.readlines()
    
    import_break = index_lines.index("\n")
    instances_break = index_lines.index("];\n")

    index_lines.insert(import_break, "import { %s } from \"./%s\";\n" % (sys.argv[2] + sys.argv[1].capitalize(), name.replace(".ts", "")))
    index_lines.insert(instances_break + 1, "    new %s(),\n" % (sys.argv[2] + sys.argv[1].capitalize()))

    with open(index_path, "w") as file:
        file.writelines(index_lines)

if __name__ == "__main__":
    main()
