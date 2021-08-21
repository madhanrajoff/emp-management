from . import *

# Password Hash
bcrypt = Bcrypt()


class _Entity(db.Model):
    __abstract__ = True

    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(120), nullable=False)

    contact_at = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.text("CURRENT_TIMESTAMP"))
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))

    @validates("password")
    def validate_password(self, key, password):
        return bcrypt.generate_password_hash(password).decode('utf-8')

    @validates("email")
    def validate_email(self, key, email):
        if not re.match("[^@]+@[^@]+\.[^@]+", email):
            raise AssertionError('Provided email is not an email address')

        return email

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return self
        except Exception as e:
            db.session.rollback()
            raise e

    def update(self, **kw):
        for k, v in kw.items():
            setattr(self, k, v)
        db.session.commit()

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            raise e

    def get_attrib_list(self):
        # noinspection PyUnresolvedReferences
        column_names = [column.name for column in self.__table__.columns]
        return column_names

    def to_dict(self):
        attrib_names = self.get_attrib_list()
        attribs = dict((name, self.__dict__.get(name)) for name in attrib_names)
        return attribs
