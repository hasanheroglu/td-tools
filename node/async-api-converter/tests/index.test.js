/*
 *  Copyright (c) 2020 Contributors to the Eclipse Foundation
 *
 *  See the NOTICE file(s) distributed with this work for additional
 *  information regarding copyright ownership.
 *
 *  This program and the accompanying materials are made available under the
 *  terms of the Eclipse Public License v. 2.0 which is available at
 *  http://www.eclipse.org/legal/epl-2.0, or the W3C Software Notice and
 *  Document License (2015-05-13) which is available at
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document.
 *
 *  SPDX-License-Identifier: EPL-2.0 OR W3C-20150513
 */

/**
 * @file Test the functionality of this package by snapshot comparison.
 */

const fs = require("fs");
const toAAP = require("../index.js");
const td = require("../examples/td.json");

if (!fs.existsSync("./out")) {
    fs.mkdirSync("./out");
}

const aapJson = fs.readFileSync("./examples/asyncapi.json", "utf-8");
const aapYaml = fs.readFileSync("./examples/asyncapi.yaml", "utf-8");

test("test the whole Async API conversion", () => {
    expect.assertions(2);

    return toAAP(td).then(
        (apiSpec) => {
            // write output
            fs.writeFileSync("./out/1.json", JSON.stringify(apiSpec.json, undefined, 4));
            fs.writeFileSync("./out/1.yaml", apiSpec.yaml);

            // test equality
            const jsonString = JSON.stringify(apiSpec.json, undefined, 4);
            expect(jsonString + "\n").toBe(aapJson);
            expect(apiSpec.yaml).toBe(aapYaml);
        },
        (err) => {
            console.error(err);
        }
    );
});
