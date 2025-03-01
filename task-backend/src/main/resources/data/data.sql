INSERT INTO keyword (word) VALUES ('Java');
INSERT INTO keyword (word) VALUES ('Spring');
INSERT INTO keyword (word) VALUES ('Hibernate');
INSERT INTO emerald_account (id, owner_name, balance) VALUES (1, 'Kamil', 10000.00);

INSERT INTO campaign (name, bid_amount, campaign_fund, campaign_status, town, radius, emerald_account_id)
VALUES 
    ('Summer Marketing Campaign', 15.00, 700.00, 'ON', 'Krakow', 20, 1),
    ('Tech Conference Promotion', 25.00, 1200.00, 'ON', 'Gdansk', 30, 1),
    ('Black Friday Deals', 20.00, 1000.00, 'OFF', 'Wroclaw', 10, 1);

INSERT INTO campaign_keywords (campaign_id,keyword_id)
VALUES 
    (1, (SELECT id FROM keyword WHERE word = 'Java')),
    (1, (SELECT id FROM keyword WHERE word = 'Spring')),
    (2, (SELECT id FROM keyword WHERE word = 'Hibernate'))