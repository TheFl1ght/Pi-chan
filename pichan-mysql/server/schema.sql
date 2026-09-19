-- Schema for pi-chan's admin-edits backend.
--
-- This does NOT store the whole site's content (that stays in the frontend's
-- static TypeScript files under src/models/, exactly as before). It stores
-- only the admin panel's edits on top of that static content:
--   - field_overrides: edited text for an existing piece of content
--     (a theory item's text, a subtopic's definition, a practice step, etc.)
--   - added_items: whole new subtopics / theory items / practice problems
--     inserted through the admin panel.
--
-- Run this once against an empty database:
--   mysql -u root -p your_database_name < schema.sql

CREATE TABLE IF NOT EXISTS field_overrides (
  path        VARCHAR(500) NOT NULL PRIMARY KEY,
  value       MEDIUMTEXT NOT NULL,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS added_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  group_key   VARCHAR(500) NOT NULL,
  item_json   JSON NOT NULL,
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_added_items_group_key (group_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS deleted_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  group_key   VARCHAR(500) NOT NULL,
  identifier  VARCHAR(500) NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_group_identifier (group_key, identifier),
  INDEX idx_deleted_items_group_key (group_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
