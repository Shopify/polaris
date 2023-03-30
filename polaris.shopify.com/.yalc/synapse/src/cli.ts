import { unified } from "unified";
import { VFile } from "vfile";
import path from "path";
import fs from "fs";
import fastGlob from "fast-glob";

import type { SynapseConfig, SynapseOptions } from "./synapse";

import { Command } from "commander";

const cwd = process.cwd();
const config = await loadSynapseConfig(cwd);

const program = new Command();

program
  .name("synapse")
  .description("CLI for running Synapse commands")
  .version("1.0.0");

program
  .command("embeddings")
  .description("Transform raw data into Synapse bits")
  .option("--name [names...]", "names of the embeddings groups to run")
  .action((args) => {
    let synapses = config.synapses;
    const synapseNames = synapses.map((synapse) => synapse.name);

    if (args.name) {
      args.name.forEach((name: string) => {
        if (!synapseNames.includes(name)) {
          throw `"${name}" not found in your synapse.config.mts. Found: ${synapseNames.join(
            ", "
          )}`;
        }
      });

      // run just the synapes specified
      synapses = synapses.filter((synapse) => args.name.includes(synapse.name));
    }

    synapses.forEach(processSynapse);
  });

async function processSynapse(options: SynapseOptions) {
  // allow a synapse to override top level config options
  const { synapses, ...sharedConfigs } = config;

  options = {
    ...sharedConfigs,
    ...options,
  };

  const files = fastGlob.sync(options.source, {});

  // configure the unified processor
  const processor = unified();
  for (let plugin of options.plugins) {
    let params;
    // plugins can be configured with params
    if (Array.isArray(plugin)) {
      const [pluginFn, ...pluginParams] = plugin;
      plugin = pluginFn;
      [params] = pluginParams;
    }

    processor.use(plugin, params);
  }

  // read in the source files
  const vFiles = files.map((file) => {
    return new VFile({
      path: file,
      value: fs.readFileSync(file, "utf8"),
    });
  });

  // process and output them
  for (let vFile of vFiles) {
    const doc = await processor.process(vFile);
    const outPath = path.join(
      options.outputDir,
      path.basename(vFile.path, ".txt") + ".json"
    );
    fs.writeFileSync(outPath, doc.value, "utf8");
    console.log(`${outPath} generated.`);
  }
}

export async function loadSynapseConfig(cwd: string): Promise<SynapseConfig> {
  const configPath = "../../../synapse.config.mts";
  const configImport = await import(configPath);
  if (configImport) {
    return configImport.default;
  } else {
    console.warn("could not find synapse.config.mts");
  }
}

program.parse(process.argv);
