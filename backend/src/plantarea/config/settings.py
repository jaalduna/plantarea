"""Application configuration loaded from YAML."""

import importlib.resources
import warnings
from pathlib import Path
from typing import Any

import yaml


_DEFAULT_CONFIG = {
    "database": {"url": "sqlite:///plantarea.db", "echo": False},
    "server": {"host": "0.0.0.0", "port": 8000, "reload": True},
    "cors": {"origins": ["http://localhost:5173", "http://localhost:3000"]},
}


def _find_config_file() -> Path | None:
    """Search for config.yaml in standard locations."""
    candidates = [
        Path("config.yaml"),
        Path("backend/config.yaml"),
    ]
    # Also check package resources
    try:
        pkg_files = importlib.resources.files("plantarea")
        pkg_config = pkg_files / "config.yaml"
        if pkg_config.is_file():  # type: ignore[union-attr]
            return Path(str(pkg_config))
    except (TypeError, FileNotFoundError):
        pass

    for candidate in candidates:
        if candidate.is_file():
            return candidate
    return None


def load_config(path: str | Path | None = None) -> dict[str, Any]:
    """Load configuration from a YAML file.

    If no path is provided, searches standard locations.
    Falls back to defaults with a warning if no config file is found.
    """
    config_path: Path | None = Path(path) if path else _find_config_file()

    if config_path and config_path.is_file():
        with open(config_path) as f:
            return yaml.safe_load(f)

    warnings.warn(
        "No config.yaml found — using default configuration. "
        "Create a config.yaml in the project root to customize settings.",
        stacklevel=2,
    )
    return _DEFAULT_CONFIG.copy()


class Settings:
    """Typed access to configuration values."""

    def __init__(self, config: dict[str, Any] | None = None) -> None:
        self._config = config or load_config()

    @property
    def database_url(self) -> str:
        return self._config["database"]["url"]

    @property
    def database_echo(self) -> bool:
        return self._config["database"].get("echo", False)

    @property
    def server_host(self) -> str:
        return self._config["server"].get("host", "0.0.0.0")

    @property
    def server_port(self) -> int:
        return self._config["server"].get("port", 8000)

    @property
    def server_reload(self) -> bool:
        return self._config["server"].get("reload", True)

    @property
    def cors_origins(self) -> list[str]:
        return self._config["cors"].get("origins", ["http://localhost:5173"])


# Singleton
settings = Settings()
