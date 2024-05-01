// Copyright 2022-2024 The MathWorks, Inc.

import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as io from "@actions/io";
//import { matlab } from "run-matlab-command-action";
import * as buildtool from "./buildtool";
import * as buildRunner from "./runMatlabBuild"

/**
 * Gather action inputs and then run action.
 */
async function run() {
    const platform = process.platform;
    const architecture = process.arch;
    const workspaceDir = process.cwd();

//     // Export env variable to inject the buildtool plugin
//     core.exportVariable('MW_MATLAB_BUILDTOOL_DEFAULT_PLUGINS_FCN_OVERRIDE', 'matlab.ciplugins.github.getDefaultPlugins');

    const options: buildtool.RunBuildOptions = {
        Tasks: core.getInput("tasks"),
        BuildOptions: core.getInput("build-options"),
    };

//     const command = buildtool.generateCommand(options);
//     const startupOptions = core.getInput("startup-options").split(" ");

//     const helperScript = await core.group("Generate script", async () => {
//         const helperScript = await buildRunner.generateScript(workspaceDir, command);
//         core.info("Successfully generated script");
//         return helperScript;
//     });


//     //await core.notice('\u001b[35mRunning MATLAB build');
//     core.info('\u001b[35mRunning MATLAB build');
//     await buildRunner.runCommand(helperScript, platform, architecture, exec.exec, startupOptions);  //{

//    // });

//    // Adding Summary details in log
//    core.info("\u001b[35m####### MATLAB build summary #######");
//    core.info("\u001b[32mTasks run: "+ 3);
//    core.info("\u001b[38;2;255;0;0mTasks failed: "+ 0);
//    core.info("\u001b[33mTasks skipped: "+ 0);

//    //Addding summary Page
//    core.summary
//      .addHeading('MATLAB Build Results')
//      //.addCodeBlock(generateTestResults(), "js")
//      .addTable([
//        [{data: 'Task Name', header: true}, {data: 'Status', header: true}, {data: 'Description', header: true}, {data: 'Duration (HH:MM:SS)', header: true}],
//        ['build', 'Pass ✅', 'Builds the code', '00:00:01'],
//        ['test', 'Fail ❌', 'Run tests', '00:00:05'],
//        ['verify', 'Skipped 🚫', 'Runs static analysis', '00:00:00']
//      ])
//      .addLink('View detailed build result', 'https://github.com')
//      .write()

    // //Test results in summary
    // await core.summary
    // .addHeading('MATLAB Test Results')
    // //.addCodeBlock(generateTestResults(), "js")
    // .addTable([
    //     [{data: 'Test Name', header: true}, {data: 'Diagnostics', header: true}, {data: 'Duration', header: true}],
    //     ['✅ TestFile1', '', '0.01s'],
    //     ['✅ TestFile2', '', '0.02s'],
    //     ['❌ TestFile3', 'Stack trace', '5.00s'],
    //     // [core.summary.addRaw('lorem in table'), '', '']
    // ])
    // .addDetails('lorem', 'ipsum')
    // // .addLink('View detailed test result', 'https://github.com')
    // .write()

    await core.summary
    .addRaw(`<head><style>
        details > summary {list-style-type: '✅';}
        </style></head>`, true)
    .addRaw(`<table>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
    <tr>
      <td>Alfreds Futterkiste</td>
      <td>Maria Anders</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td><details> <summary>Click me</summary> </details></td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
    </tr>
    </table>`, true)
    .addRaw('<details> <summary>Click me</summary> </details>', true)
    .write()

    // Cleanup post run for self hosted runners
    // await io.rmRF(workspaceDir + '/.matlab');

}

run().catch((e) => {
    core.setFailed(e);
});
