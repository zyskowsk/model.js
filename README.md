Model
=====

A lightweight node ORM for mysql

Running tests
=============

First setup the test db by running the following from within the base directory:
`mysql -u root < test/schema.sql`

Then, run the test suite with:
`TEST_ENV=test npm test`
