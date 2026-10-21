# OpenPyStruct

[![CI](https://github.com/OpenPyStruct/OpenPyStruct/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/OpenPyStruct/OpenPyStruct/actions/workflows/ci.yml)
[![Yak release](https://github.com/OpenPyStruct/OpenPyStruct/actions/workflows/yak-release.yml/badge.svg)](https://github.com/OpenPyStruct/OpenPyStruct/actions/workflows/yak-release.yml)
[![Release](https://img.shields.io/github/v/release/OpenPyStruct/OpenPyStruct?include_prereleases&label=release)](https://github.com/OpenPyStruct/OpenPyStruct/releases)
[![Yak](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fyak.rhino3d.com%2Fpackages%2FOpenPyStruct&query=%24.version&logo=Rhinoceros&label=Yak)](https://yak.rhino3d.com/packages/OpenPyStruct)
[![Downloads](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fyak.rhino3d.com%2Fpackages%2FOpenPyStruct&query=%24.download_count&label=downloads&color=brightgreen)](https://yak.rhino3d.com/packages/OpenPyStruct)
[![Rhino 8](https://img.shields.io/badge/Rhino-8-blue?logo=Rhinoceros)](https://www.rhino3d.com)
[![Python](https://img.shields.io/badge/python-%E2%89%A53.9-blue?logo=python&logoColor=white)](pyproject.toml)
[![License](https://img.shields.io/badge/license-GPL--3.0--or--later-blue)](LICENSE)

**OpenPyStruct** is an open-source toolkit for machine-learning-based structural optimization:
finite-element models in OpenSees, gradient-based moment-of-inertia design of beams and frames,
training-data generation, and neural surrogates (FNN, PINN) for single- and multi-load-case problems.
It ships as a **Grasshopper plugin** (Rhino 8) and as a **Python package / CLI**.

## Install

### Grasshopper (Rhino 8)

In Rhino run `PackageManager`, search for **OpenPyStruct**, install, restart Rhino. Or from a shell:

```bash
yak install OpenPyStruct
```

The plugin runs the engine in a container (Podman or Docker) or natively. Setup, components and
workflows: [grasshopper/README.md](grasshopper/README.md).

### Python package

```bash
conda env create -f environment.yml && conda activate OpenPyStruct   # or: pip install -e ".[test]"
openpystruct run case.json result.json
```

Or build the engine image: `docker/build.sh`.

## Repository layout

```
openpystruct/        Python package: fe, optimize, beam, datagen, ml/, cli
grasshopper/         Rhino/Grasshopper plugin (.gha), Rhino-free core + tests, YAK manifest
docker/              Engine images (CPU, CUDA)
scripts/research/    Original research scripts (beta/ = experimental); see its README
tests/               Python tests
.github/workflows/   CI and the Yak release pipeline
```

## Features

- **Classical model-based optimizers** for generating training data
- **OpenSeesPy integration** (numpy direct-stiffness fallback where OpenSeesPy has no wheel)
- **Multi-core and GPU** data generation and training (CUDA, Apple MPS)
- **PINN and FNN surrogates** for fast prediction of optimized sections
- **User-defined constraints, objectives and loss weights**

## Citing

If you use OpenPyStruct in research, please cite the paper (GitHub shows a "Cite this repository" button from [CITATION.cff](CITATION.cff)):

> Smyl, D., Zhuang, B., Rigby, S., Bruun, E., Jones, B., Kastner, P., Tien, I., Gallet, A.
> *OpenPyStruct: Open-Source Toolkit for Machine Learning-Driven Structural Optimization.*
> Engineering Structures, 2025. [doi:10.1016/j.engstruct.2025.120869](https://doi.org/10.1016/j.engstruct.2025.120869)

## Authors and acknowledgements

The Grasshopper plugin and Yak packaging are by Patrick Kastner and Danny Smyl. The optimizers,
surrogates and research scripts are the work of the paper's authors; per the paper's CRediT
statement, software contributions come from Danny Smyl, Bozhou Zhuang, Adrien Gallet and Edvard Bruun
(GitHub implementation), with validation and review by Sam Rigby, Brandon Jones, Patrick Kastner and
Iris Tien.

## Releasing

Push a tag `vX.Y.Z` (or `vX.Y.Z-beta.N`). [`yak-release.yml`](.github/workflows/yak-release.yml)
tests, builds, pushes the package to Yak and creates the GitHub release. Yak versions can be yanked
but not re-published, so tag deliberately.

## License

GPL-3.0-or-later, see [LICENSE](LICENSE). Original MIT-licensed code is credited in
[NOTICE.md](NOTICE.md).
