CREATE VIRTUAL TABLE post_fts USING fts5(id, title, content);

CREATE TRIGGER post_insert AFTER INSERT ON Post
BEGIN
  INSERT INTO post_fts (id, title, content)
  VALUES (new.id, new.title, new.content);
END;

CREATE TRIGGER post_update AFTER UPDATE ON Post
BEGIN
  UPDATE post_fts SET
    title = new.title,
    content = new.content
  WHERE id = old.id;
END;

CREATE TRIGGER post_delete AFTER DELETE ON Post
BEGIN
  DELETE FROM post_fts WHERE id = old.id;
END;

CREATE VIRTUAL TABLE comment_fts USING fts5(id, content);

CREATE TRIGGER comment_insert AFTER INSERT ON Comment
BEGIN
  INSERT INTO comment_fts (id, content)
  VALUES (new.id, new.content);
END;

CREATE TRIGGER comment_update AFTER UPDATE ON Comment
BEGIN
  UPDATE comment_fts SET
    content = new.content
  WHERE id = old.id;
END;

CREATE TRIGGER comment_delete AFTER DELETE ON Comment
BEGIN
  DELETE FROM comment_fts WHERE id = old.id;
END;