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
    .addHeading('MATLAB Test Results')
    .addRaw(`<table>
    <tr align="center">
        <th>Total tests</th>
        <th>Passed ✅</th>
        <th>Failed ❌</th>
        <th>Incomplete ⚠️</th>
        <th>Not Run 🚫</th>
    </tr>
    <tr align="center">
        <td>6</td>
        <td>5</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
    </tr>
    </table>`, true)
    .addHeading('All tests', 2)
    .addRaw(`<table>
    <tr>
      <th>Test Name</th>
      <th>Diagnostics</th>
      <th>Duration</th>
    </tr>
    <tr>
      <td><details> <summary>TestFile 1 ✅</summary>
        <p>
        Test 1_1 ✅</br>
        Test 1_2 ✅
        </p>
      </details></td>
      <td></td>
      <td valign="top" align="center">0.01s</td>
    </tr>
    <tr>
      <td><details> <summary>TestFile 2 ✅</summary></details></td>
      <td></td>
      <td valign="top" align="center">0.02s</td>
    </tr>
    <tr>
      <td><details> <summary>TestFile 3 ❌</summary>
        <p align="right">
        </br>Test 3_1 ✅
        </br>Test 3_2 ❌
        </br>Test 3_3 ✅
        </p>
      </details></td>
      <td>
      <p>
        <details><summary>Stack trace</summary></br>
        </br>
      </p>
      </td>
      <td valign="top" align="center">5.00s</td>
    </tr>
    </table>`, true)
    .addHeading('MATLAB Code Coverage')
    .addRaw(`<table>
    <tr>
        <td valign="top">Function</td>
        <td align="center"><img src="https://progress-bar.xyz/100"></td>
    </tr>
    <tr>
        <td valign="middle">Statement</td>
        <td align="center"><img src="https://progress-bar.xyz/88"></td>
    </tr>
    <tr>
        <td valign="bottom">Decision</td>
        <td align="center"><img src="https://progress-bar.xyz/80"></td>
    </tr>
    <tr>
        <td valign="baseline">Condition</td>
        <td align="center"><img src="https://progress-bar.xyz/66"></td>
    </tr>
    <tr>
        <td>MC/DC</td>
        <td valign="top" align="center"><img src="https://progress-bar.xyz/53"></td>
    </tr>
    </table>
    <a href="">Click here</a> to debug using MATLAB Online
    </br>
    <a href="">Click here</a> to manage project on Design Center
    </br>
    <a href="">Click here</a> to view & share results via Quality Center
    </br>`, true)
    .write()

    // Cleanup post run for self hosted runners
    // await io.rmRF(workspaceDir + '/.matlab');

}

run().catch((e) => {
    core.setFailed(e);
});
